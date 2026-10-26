/**
 * DATA LAYER ENTRY POINT
 * ----------------------------------------------------------------------------
 * The ONLY module the UI imports data from:
 *
 *     import { getTreatments, getTreatmentBySlug } from '@/lib/repositories'
 *
 * Components must never import `@/data/*` directly. That rule is what makes
 * moving to MongoDB — or to a CMS later — a change to the `dataSource`
 * constant below and nothing else.
 */

import type { DataSourceBundle } from './contracts'
import { demoBlogRepository } from './demo/blog-repository'
import { demoDoctorRepository } from './demo/doctor-repository'
import { demoStoryRepository } from './demo/story-repository'
import { demoTreatmentRepository } from './demo/treatment-repository'
import { demoWebinarRepository } from './demo/webinar-repository'
import { mongoBlogRepository } from './mongo/blog-repository'
import { mongoDoctorRepository } from './mongo/doctor-repository'
import { mongoStoryRepository } from './mongo/story-repository'
import { mongoTreatmentRepository } from './mongo/treatment-repository'
import { mongoWebinarRepository } from './mongo/webinar-repository'

const demoDataSource: DataSourceBundle = {
  treatments: demoTreatmentRepository,
  doctors: demoDoctorRepository,
  webinars: demoWebinarRepository,
  stories: demoStoryRepository,
  blog: demoBlogRepository,
}

const mongoDataSource: DataSourceBundle = {
  treatments: mongoTreatmentRepository,
  doctors: mongoDoctorRepository,
  webinars: mongoWebinarRepository,
  stories: mongoStoryRepository,
  blog: mongoBlogRepository,
}

/**
 * Active data source, selected by `DATA_SOURCE` in the environment.
 *
 *   DATA_SOURCE=mongodb  -> MongoDB Atlas (requires MONGODB_URI)
 *   anything else, unset -> the demo files in `src/data`
 *
 * DEMO IS THE DEFAULT, AND DELIBERATELY SO. A misspelled or missing variable
 * falls back to a source that always works, so a bad deploy renders the site
 * with placeholder content rather than a stack trace on every route. Opting IN
 * to the database is an explicit act.
 *
 * NOT `NEXT_PUBLIC_`: this is read on the server only, and a public prefix
 * would inline the value into the client bundle for no reason.
 */
const dataSource: DataSourceBundle =
  process.env.DATA_SOURCE === 'mongodb' ? mongoDataSource : demoDataSource

/* --------------------------------------------------------------------------
   Flat, tree-shakeable accessors. Arrow wrappers (not method references) keep
   `this` bound correctly regardless of how an implementation is authored.
   -------------------------------------------------------------------------- */

/* Treatments */
export const getTreatments: DataSourceBundle['treatments']['getTreatments'] = (q) =>
  dataSource.treatments.getTreatments(q)
export const getTreatmentBySlug: DataSourceBundle['treatments']['getTreatmentBySlug'] = (s) =>
  dataSource.treatments.getTreatmentBySlug(s)
export const getFeaturedTreatments: DataSourceBundle['treatments']['getFeaturedTreatments'] = (l) =>
  dataSource.treatments.getFeaturedTreatments(l)
export const getRelatedTreatments: DataSourceBundle['treatments']['getRelatedTreatments'] = (s, l) =>
  dataSource.treatments.getRelatedTreatments(s, l)
export const getTreatmentsByDoctor: DataSourceBundle['treatments']['getTreatmentsByDoctor'] = (s) =>
  dataSource.treatments.getTreatmentsByDoctor(s)
export const getTreatmentCategories: DataSourceBundle['treatments']['getTreatmentCategories'] = () =>
  dataSource.treatments.getTreatmentCategories()
export const getAllTreatmentSlugs: DataSourceBundle['treatments']['getAllTreatmentSlugs'] = () =>
  dataSource.treatments.getAllTreatmentSlugs()

/* Specialists */
export const getDoctors: DataSourceBundle['doctors']['getDoctors'] = (q) =>
  dataSource.doctors.getDoctors(q)
export const getDoctorBySlug: DataSourceBundle['doctors']['getDoctorBySlug'] = (s) =>
  dataSource.doctors.getDoctorBySlug(s)
export const getDoctorsBySlugs: DataSourceBundle['doctors']['getDoctorsBySlugs'] = (s) =>
  dataSource.doctors.getDoctorsBySlugs(s)
export const getFeaturedDoctors: DataSourceBundle['doctors']['getFeaturedDoctors'] = (l) =>
  dataSource.doctors.getFeaturedDoctors(l)
export const getAllDoctorSlugs: DataSourceBundle['doctors']['getAllDoctorSlugs'] = () =>
  dataSource.doctors.getAllDoctorSlugs()

/* Webinars */
export const getWebinars: DataSourceBundle['webinars']['getWebinars'] = (q) =>
  dataSource.webinars.getWebinars(q)
export const getWebinarBySlug: DataSourceBundle['webinars']['getWebinarBySlug'] = (s) =>
  dataSource.webinars.getWebinarBySlug(s)
export const getNextWebinar: DataSourceBundle['webinars']['getNextWebinar'] = () =>
  dataSource.webinars.getNextWebinar()
export const getAllWebinarSlugs: DataSourceBundle['webinars']['getAllWebinarSlugs'] = () =>
  dataSource.webinars.getAllWebinarSlugs()

/* Patient stories */
export const getStories: DataSourceBundle['stories']['getStories'] = (q) =>
  dataSource.stories.getStories(q)
export const getStoryBySlug: DataSourceBundle['stories']['getStoryBySlug'] = (s) =>
  dataSource.stories.getStoryBySlug(s)
export const getFeaturedStories: DataSourceBundle['stories']['getFeaturedStories'] = (l) =>
  dataSource.stories.getFeaturedStories(l)
export const getAllStorySlugs: DataSourceBundle['stories']['getAllStorySlugs'] = () =>
  dataSource.stories.getAllStorySlugs()

/* Journal */
export const getPosts: DataSourceBundle['blog']['getPosts'] = (q) =>
  dataSource.blog.getPosts(q)
export const getPostsPage: DataSourceBundle['blog']['getPostsPage'] = (q) =>
  dataSource.blog.getPostsPage(q)
export const getPostBySlug: DataSourceBundle['blog']['getPostBySlug'] = (s) =>
  dataSource.blog.getPostBySlug(s)
export const getLatestPosts: DataSourceBundle['blog']['getLatestPosts'] = (l) =>
  dataSource.blog.getLatestPosts(l)
export const getRelatedPosts: DataSourceBundle['blog']['getRelatedPosts'] = (s, l) =>
  dataSource.blog.getRelatedPosts(s, l)
export const getPostCategories: DataSourceBundle['blog']['getPostCategories'] = () =>
  dataSource.blog.getPostCategories()
export const getAllPostSlugs: DataSourceBundle['blog']['getAllPostSlugs'] = () =>
  dataSource.blog.getAllPostSlugs()

export type * from './contracts'
