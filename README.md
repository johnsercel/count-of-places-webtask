# count-of-places-webtask
Node.js service for returning number of places for a given lat/lon, type, and radius. Uses Google Places API. Written for use with webtask.io.

#####Example request
https://my-webtask-subdomain.run.webtask.io/count-of-places/?location=34.0657,-83.9851&radius=1610&type=restaurant

#####Returns
int: number of matching places
