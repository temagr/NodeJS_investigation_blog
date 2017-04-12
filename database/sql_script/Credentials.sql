USE [Blog]
GO

/****** Object:  Table [dbo].[Credentials]    Script Date: 12.04.2017 18:25:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Credentials](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](200) NULL,
	[password] [nvarchar](200) NULL
) ON [PRIMARY]

GO


