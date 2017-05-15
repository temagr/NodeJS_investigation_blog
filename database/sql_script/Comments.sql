USE [Blog]
GO

/****** Object:  Table [dbo].[Comments]    Script Date: 15.05.2017 10:53:58 ******/
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


