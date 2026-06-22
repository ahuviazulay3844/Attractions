import { getTripMeta } from '../constants/tripImages'

export function getRatedComments(comments = []) {
  return comments.filter((c) => c.rating >= 1 && c.rating <= 5)
}

export function getTripRatingStats(tripId, trip, allComments = []) {
  const tripComments = allComments.filter((c) => c.idAttraction?.id === Number(tripId))
  const rated = getRatedComments(tripComments)

  if (rated.length > 0) {
    const sum = rated.reduce((s, c) => s + c.rating, 0)
    return {
      average: Math.round((sum / rated.length) * 10) / 10,
      count: rated.length,
      fromComments: true,
    }
  }

  const meta = getTripMeta(trip)
  return {
    average: meta.baseRating ?? 4.2,
    count: meta.baseReviews ?? 8,
    fromComments: false,
  }
}
