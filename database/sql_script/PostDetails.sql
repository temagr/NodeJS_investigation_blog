USE [Blog]
GO

/****** Object:  Table [dbo].[PostDetails]    Script Date: 15.05.2017 10:54:44 ******/
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


