import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('./shared/types/cms.ts');
const configPath = path.resolve('./public/admin/cms/config.yml');

const rawYaml = fs.readFileSync(configPath, 'utf-8');

const anchorRegex = /^(\w+):\s*&(\w+)\s*\n((?:^[ \t]+.+\n?)*)/gm;
const anchors: Record<string, any[]> = {};

let match: RegExpExecArray | null;
while ((match = anchorRegex.exec(rawYaml))) {
    const [, , anchorName, body] = match;
    const dummy = yaml.load(`fields:\n${body}`) as any;
    if (dummy?.fields) {
        anchors[anchorName] = dummy.fields;
    }
}

// Parse YAML using js-yaml
const config = yaml.load(rawYaml);

// ---- Convert widget type to TS type
function widgetToType(widget: string): string {
    switch (widget) {
        case 'string':
        case 'text':
        case 'markdown':
        case 'datetime':
        case 'file':
        case 'image':
        case 'select':
            return 'string';
        case 'boolean':
            return 'boolean';
        case 'number':
            return 'number';
        default:
            return 'any';
    }
}

// ---- Utility: PascalCase
function pascalCase(str: string): string {
    return str.replace(/(^\w|[-_\s]\w)/g, (s) =>
        s.replace(/[-_\s]/, '').toUpperCase()
    );
}

const interfaces: string[] = [];
const generatedAnchors = new Set<string>();

// ---- Manually resolve <<: *alias style merges for object or list fields
function resolveAnchors(fieldNode: any, anchors: any): any[] {
    const mergedFields: any[] = [];

    if (fieldNode && typeof fieldNode === 'object') {
        const raw = fieldNode;

        // Add actual subfields
        if (raw.fields) {
            mergedFields.push(...raw.fields);
        }
    }

    return mergedFields;
}

function isFieldAnAnchor(typeFields, anchorFields) {
    if (Array.isArray(typeFields)) {
        return typeFields.every((typeField) => {
            if (!!typeField.label && !!typeField.name) {
                return anchorFields.fields.some((it) => {
                    return (
                        it.label === typeField.label &&
                        it.name === typeField.name
                    );
                });
            }
            return false;
        });
    }
    return false;
}

// ---- Generate TypeScript interface from fields
function generateInterface(
    typeName: string,
    fields: any[],
    rawFieldNodes: any[] = [],
    anchors: any
): string {
    const lines: string[] = [];

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const rawField = rawFieldNodes[i]; // original YAML node, with anchors

        const { name, widget, required } = field;
        if (!name || !widget) continue;

        const isOptional = required === false;

        if (widget === 'object') {
            const subFields = resolveAnchors(rawField, anchors);

            // Detect anchor match
            const anchorEntry = Object.entries(anchors).find(
                ([, anchorFields]) => isFieldAnAnchor(subFields, anchorFields)
            );

            if (anchorEntry) {
                const anchorName = pascalCase(anchorEntry[0]);
                lines.push(`  ${name}${isOptional ? '?' : ''}: ${anchorName};`);

                if (!generatedAnchors.has(anchorName)) {
                    interfaces.push(
                        generateInterface(
                            anchorName,
                            subFields,
                            subFields,
                            anchors
                        )
                    );
                    generatedAnchors.add(anchorName);
                }
            } else {
                const nestedType = `${typeName}${pascalCase(name)}`;
                lines.push(`  ${name}${isOptional ? '?' : ''}: ${nestedType};`);
                interfaces.push(
                    generateInterface(nestedType, subFields, subFields, anchors)
                );
            }
        } else if (widget === 'list' && Array.isArray(field.fields)) {
            const nestedType = `${typeName}${pascalCase(name)}Item`;
            lines.push(`  ${name}${isOptional ? '?' : ''}: ${nestedType}[];`);
            interfaces.push(
                generateInterface(
                    nestedType,
                    field.fields,
                    field.fields,
                    anchors
                )
            );
        } else {
            lines.push(
                `  ${name}${isOptional ? '?' : ''}: ${widgetToType(widget)};`
            );
        }
    }

    return `export interface ${typeName} {\n${lines.join('\n')}\n}\n`;
}

// ---- Main processing

// Generate interfaces for each collection
for (const collection of config.collections) {
    const { name, fields } = collection;
    if (!name || !Array.isArray(fields)) continue;

    const typeName = `Cms${pascalCase(name)}`;
    const topLevelInterface = generateInterface(
        typeName,
        fields,
        fields,
        anchors
    );
    interfaces.unshift(topLevelInterface); // main type first
}

// ---- Write output
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, interfaces.join('\n'), 'utf-8');

console.log(`✅ Generated types at ${outputPath}`);
