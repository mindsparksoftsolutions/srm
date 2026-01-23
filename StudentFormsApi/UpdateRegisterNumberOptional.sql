BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[srm].[CollegeStudents]') AND [c].[name] = N'RegisterNumber');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [srm].[CollegeStudents] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [srm].[CollegeStudents] ALTER COLUMN [RegisterNumber] nvarchar(15) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260123072626_MakeRegisterNumberOptional', N'8.0.0');
GO

COMMIT;
GO

