-- Blog DB creation

--Users Table

USE [Blog]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Email] [varchar](255) NULL,
	[Password] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

-- Posts Table

USE [Blog]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Posts](
	[postID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NULL,
	[Date] [date] NULL,
	[OwnerID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[postID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Posts]  WITH CHECK ADD FOREIGN KEY([OwnerID])
REFERENCES [dbo].[Users] ([userID])
GO

--PostDetails

USE [Blog]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PostDetails](
	[detailID] [int] IDENTITY(1,1) NOT NULL,
	[postID] [int] NULL,
	[PostBody] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[detailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[PostDetails]  WITH CHECK ADD FOREIGN KEY([postID])
REFERENCES [dbo].[Posts] ([postID])
GO

--Comments Table

USE [Blog]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Comments](
	[commentID] [int] IDENTITY(1,1) NOT NULL,
	[commentContent] [nvarchar](max) NULL,
	[Date] [date] NULL,
	[commentOwnerID] [int] NULL,
	[postDetailID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[commentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([commentOwnerID])
REFERENCES [dbo].[Users] ([userID])
GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([postDetailID])
REFERENCES [dbo].[PostDetails] ([detailID])
GO

-- Credentials Table

USE [Blog]
GO

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

--Rates Table

USE [Blog]
GO

/****** Object:  Table [dbo].[Rates]    Script Date: 15.05.2017 10:55:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Rates](
	[rateID] [int] IDENTITY(1,1) NOT NULL,
	[postID] [int] NULL,
	[userID] [int] NULL,
	[rate] [float] NULL,
UNIQUE NONCLUSTERED 
(
	[rateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Rates]  WITH CHECK ADD FOREIGN KEY([postID])
REFERENCES [dbo].[Posts] ([postID])
GO

ALTER TABLE [dbo].[Rates]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userID])
GO












