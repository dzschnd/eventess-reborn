ALTER TABLE "invitations"
ADD COLUMN "template_name" TEXT;

UPDATE "invitations"
SET "template_name" = "templates"."name"
FROM "templates"
WHERE "invitations"."template_id" = "templates"."id";

ALTER TABLE "invitations"
ALTER COLUMN "template_name" SET NOT NULL;

ALTER TABLE "invitations"
DROP CONSTRAINT "invitations_template_id_fkey";

DROP INDEX "invitations_template_id_idx";

ALTER TABLE "invitations"
DROP COLUMN "template_id";

DROP TABLE "templates";
