CREATE TABLE `lucia-session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `lucia-user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lucia-user` (
	`id` text PRIMARY KEY NOT NULL,
	`github_id` text NOT NULL,
	`username` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lucia-user_github_id_unique` ON `lucia-user` (`github_id`);