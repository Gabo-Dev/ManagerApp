CREATE TABLE `clientes` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`email` text NOT NULL,
	`notas` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clientes_email_unique` ON `clientes` (`email`);--> statement-breakpoint
CREATE TABLE `revisiones` (
	`id` text PRIMARY KEY NOT NULL,
	`cliente_id` text NOT NULL,
	`fecha` text NOT NULL,
	`edad` integer NOT NULL,
	`sexo` text NOT NULL,
	`tipo_actividad` text NOT NULL,
	`peso_ayunas_kg` real NOT NULL,
	`estatura_m` real NOT NULL,
	`pliegue_tricipital` real NOT NULL,
	`pliegue_escapular` real NOT NULL,
	`pliegue_abdominal` real NOT NULL,
	`pliegue_iliaco` real NOT NULL,
	`circunferencia_brazo` real NOT NULL,
	`circunferencia_muslo` real NOT NULL,
	`circunferencia_pantorrilla` real NOT NULL,
	`medida_cuello` real,
	`medida_cintura` real,
	`medida_cadera` real,
	`medida_pecho` real,
	`medida_espalda` real,
	`medida_biceps` real,
	`medida_cuadriceps` real,
	`medida_gemelo` real,
	`imc` real NOT NULL,
	`porcentaje_grasa` real NOT NULL,
	`peso_graso_kg` real NOT NULL,
	`mlg_kg` real NOT NULL,
	`porcentaje_mme` real NOT NULL,
	`porcentaje_otros` real NOT NULL,
	`observaciones` text,
	FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON UPDATE no action ON DELETE cascade
);
