import { Pagination } from 'swiper'

export interface CourseCardInterface {
  id: string
  name: string
  description: string
  image: string
}

export interface Pagination {
  total: number
  lastPage: number
  page: number
  pageSize: number
}

export interface DataQuestions {
  id: string
  name: string
  description: string
  fromTime: Date
  toTime: Date
}

export interface QuestionsResponse {
  pagination: Pagination
  data: DataQuestions[]
}

export interface Answer {
  A: string
  B: string
  C: string
  D: string
}

export interface Metadata {
  id: number
  name: string
  answer: Answer[]
}

export interface ListQuestionResponse {
  id: string
  name: string
  fromTime: Date
  toTime: Date
  metadata: Metadata[]
  createdAt: Date
  updatedAt: Date
  description: string
}
