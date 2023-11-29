import { SerializeObject as NitroSerializeObject } from 'nitropack';

export type SerializeObject<T extends object> = NitroSerializeObject<T>;
