import { type InferSelectModel, relations, sql } from 'drizzle-orm';
import {
    index,
    integer,
    primaryKey,
    sqliteTable,
    text,
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { v4 as uuidv4 } from 'uuid';

// updatedAt column is not handled automatically right now

export const messages = sqliteTable('Message', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    read: integer('read', { mode: 'boolean' }).notNull().default(false),
    email: text('email').notNull(),
    firstname: text('firstname').notNull(),
    lastname: text('lastname').notNull(),
    message: text('message').notNull(),
    deleted: integer('deleted', { mode: 'boolean' }).notNull().default(false),
});

export const messagesRelations = relations(messages, ({ one }) => ({
    messageReply: one(messageReplies),
}));

const messageStatus = [
    'PENDING',
    'PROCESSED',
    'DROPPED',
    'DEFERRED',
    'BOUNCED',
    'DELIVERED',
    'OPENED',
    'CLICKED',
] as const;

export type MessageStatus = (typeof messageStatus)[number];

export const messageReplies = sqliteTable(
    'MessageReply',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => uuidv4()),
        name: text('name').notNull(),
        toEmail: text('toEmail').notNull(),
        createdAt: text('createdAt')
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
        updatedAt: text('updatedAt')
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
        sendGridMessageId: text('sendGridMessageId'),
        sendGridMessageStatus: text('sendGridMessageStatus', {
            enum: messageStatus,
        })
            .notNull()
            .default('PENDING'),
        messageId: integer('messageId', { mode: 'number' })
            .notNull()
            .references(() => messages.id, { onDelete: 'cascade' }),
    },
    (table) => {
        return {
            sendGridMessageIdIdx: index(
                'messageReplies_sendGridMessageIdIdx'
            ).on(table.sendGridMessageId),
        };
    }
);

export const messageRepliesRelations = relations(messageReplies, ({ one }) => ({
    message: one(messages, {
        fields: [messageReplies.messageId],
        references: [messages.id],
    }),
}));

export type MessageWithReply = InferSelectModel<typeof messages> & {
    messageReply?: InferSelectModel<typeof messageReplies>;
};

export const purchaseAudits = sqliteTable(
    'PurchaseAudit',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => uuidv4()),
        createdAt: text('createdAt')
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
        updatedAt: text('updatedAt')
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
        email: text('email').notNull(),
        product: text('product').notNull(),
        country: text('country'),
        firstName: text('firstName').notNull(),
        lastName: text('lastName'),
        sentProduct: integer('sentProduct', { mode: 'boolean' })
            .notNull()
            .default(false),
        stripeSessionId: text('stripeSessionId').notNull(),
        sendGridMessageId: text('sendGridMessageId'),
        sendGridMessageStatus: text('sendGridMessageStatus', {
            enum: messageStatus,
        })
            .notNull()
            .default('PENDING'),
    },
    (table) => {
        return {
            stripeSessionIdIdx: index('purchaseAudits_stripeSessionIdIdx').on(
                table.stripeSessionId
            ),
            sendGridMessageIdIdx: index(
                'purchaseAudits_sendGridMessageIdIdx'
            ).on(table.sendGridMessageId),
        };
    }
);

const sendGridMessageTypes = ['PURCHASE', 'MESSAGE_REPLY'] as const;
export type SendGridMessageType = (typeof sendGridMessageTypes)[number];

export const sendGridMessagesMap = sqliteTable('SendGridMessageMap', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    type: text('type', { enum: sendGridMessageTypes }).notNull(),
});

export const keepAlives = sqliteTable('KeepAlive', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable('user', {
    id: text('id').notNull().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
    image: text('image'),
});

export const accounts = sqliteTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const freebieSignups = sqliteTable('FreebieSignups', {
    email: text('email').notNull(),
    freebieName: text('freebieName').notNull(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    createdAt: text('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updatedAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const sessions = sqliteTable('session', {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const luciaUserTable = sqliteTable('lucia-user', {
    id: text('id').primaryKey(),
    githubId: text('github_id').unique().notNull(),
    username: text('username').notNull(),
});

export const luciaSessionTable = sqliteTable('lucia-session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => luciaUserTable.id),
    expiresAt: integer('expires_at').notNull(),
});
