import styled from 'styled-components'

export const RootContainer = styled.div`
  max-width: 944px;
  min-height: 60vh;
  width: 100%;

  .header {
    max-width: 464px;
    margin-bottom: 30px;
    h1.title {
      font-family: 'Space Grotesk';
      font-size: 48px;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .description {
      font-size: 20px;
      line-height: 1.2;
    }
  }
`

export const CourseCardContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #383241;
  display: flex;

  img.cover-image {
    width: 400px;
    height: 225px;
  }

  .about-course {
    margin-inline-start: 40px;

    .head-desc {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
    }

    .course-title {
      margin-top: 16px;
      font-weight: 600;
      font-size: 28px;
      line-height: 36px;
    }

    .course-description {
      margin-top: 8px;
      font-size: 16px;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.textGrey};
    }
  }
`

export const StartCourseButton = styled.button`
  transition: background-color 0.2s, opacity 0.2s;
  font-family: 'Space Grotesk';
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  padding: 10px 16px;
  border-radius: 12px;
  background-color: #f6b24f;
  box-shadow: none;
  border: 0;
  color: ${({ theme }) => theme.colors.backgroundAlt};
  width: 120px;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
