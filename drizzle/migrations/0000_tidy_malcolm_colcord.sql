CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `KeepAlive` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `MessageReply` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`toEmail` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`sendGridMessageId` text,
	`sendGridMessageStatus` text DEFAULT 'PENDING' NOT NULL,
	`messageId` integer NOT NULL,
	FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`read` integer DEFAULT false NOT NULL,
	`email` text NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`message` text NOT NULL,
	`deleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `PurchaseAudit` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`email` text NOT NULL,
	`product` text NOT NULL,
	`country` text,
	`firstName` text NOT NULL,
	`lastName` text,
	`sentProduct` integer DEFAULT false NOT NULL,
	`stripeSessionId` text NOT NULL,
	`sendGridMessageId` text,
	`sendGridMessageStatus` text DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `SendGridMessageMap` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `messageReplies_sendGridMessageIdIdx` ON `MessageReply` (`sendGridMessageId`);--> statement-breakpoint
CREATE INDEX `purchaseAudits_stripeSessionIdIdx` ON `PurchaseAudit` (`stripeSessionId`);--> statement-breakpoint
CREATE INDEX `purchaseAudits_sendGridMessageIdIdx` ON `PurchaseAudit` (`sendGridMessageId`);