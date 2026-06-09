const baseUrl = process.env.EXPO_SMOKE_BASE_URL ?? 'http://localhost:8081';
const routes = [
  '/',
  '/orbit',
  '/orbit/obj-envisat',
  '/priority',
  '/missions',
  '/missions?missionType=recycle&objectId=obj-envisat',
  '/circular',
];

async function checkRoute(route) {
  const response = await fetch(`${baseUrl}${route}`);

  if (!response.ok) {
    throw new Error(`${route} returned ${response.status}`);
  }

  return `${route} ${response.status}`;
}

try {
  const results = await Promise.all(routes.map(checkRoute));
  console.log(results.join('\n'));
} catch (error) {
  console.error(error);
  process.exit(1);
}
