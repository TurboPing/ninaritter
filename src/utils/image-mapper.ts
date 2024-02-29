export const mapLandingPageImages = (images: string[]) => {
  const COLUMNS_COUNT = 3;
  const imagesCopy: string[] = JSON.parse(JSON.stringify(images));
  const result = [];

  while(imagesCopy.length) result.push(imagesCopy.splice(0, COLUMNS_COUNT));

  return result;
}