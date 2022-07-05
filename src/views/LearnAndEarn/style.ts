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
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }

  .course-wrapper {
    border-radius: 16px;
    border: 1px solid #383241;
  }
`

export const CourseCardContainer = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid #383241;
  }

  .cover-image {
    width: 400px;
    height: 225px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .about-course {
    margin-inline-start: 40px;
    width: 50%;
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

export const LearningContainer = styled.div`
  max-width: 944px;
  min-height: 60vh;
  width: 100%;

  .question {
    display: flex;
    justify-content: space-between;

    .question__name {
      margin-top: 8px;
      margin: 0;
      font-size: 28px;
      font-weight: 400;
    }

    .total-question {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
    }
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    gap: 30px;
    margin-top: 30px;

    .answer-item {
      width: calc(100% / 2 - 30px);
      display: flex;
      overflow: hidden;

      input {
        display: none;
      }

      .answer-label {
        border: 1px solid ${({ theme }) => theme.colors.textGrey};
        border-radius: 8px;
        padding: 12px;
        min-height: 50px;
        position: relative;
        width: 100%;
        display: inline-block;
        font-size: 16px;
        text-align: center;
        transform: none;
        line-height: 1.2;
        transition: 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
        }
      }

      .answer-checked {
        background-color: ${({ theme }) => theme.colors.primaryYellow};
        color: ${({ theme }) => theme.colors.backgroundAlt};
      }
    }
  }

  .control-button {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
`

export const NavigateHeader = styled.div`
  width: 100%;
  margin-bottom: 30px;

  .navigate-back {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.textGrey};
    cursor: pointer;
    transition: 0.1s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`
