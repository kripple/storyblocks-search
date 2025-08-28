import { createHmac } from 'crypto';

export function buildAuthenticatedUrl({
  resource,
  publicKey,
  privateKey,
  user_id,
  additionalParams = {},
}: {
  resource: string;
  publicKey: string;
  privateKey: string;
  user_id: string;
  additionalParams?: Record<string, string>;
}) {
  const project_id = 'test-project-storyblocks-search';
  const baseUrl = 'https://api.storyblocks.com';

  // HMAC generation
  const expires = Math.floor(Date.now() / 1000) + 3600;
  const hmacBuilder = createHmac('sha256', privateKey + expires);
  hmacBuilder.update(resource);
  const hmac = hmacBuilder.digest('hex');

  // Build the full URL with auth params
  const url = new URL(baseUrl + resource);
  url.searchParams.set('APIKEY', publicKey);
  url.searchParams.set('EXPIRES', expires.toString());
  url.searchParams.set('HMAC', hmac);
  url.searchParams.set('user_id', user_id);
  url.searchParams.set('project_id', project_id);

  // Add any additional parameters
  Object.entries(additionalParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url;
}
