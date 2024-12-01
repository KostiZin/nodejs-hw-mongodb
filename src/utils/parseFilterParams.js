function parseFavourite(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
}

function parseContactType(value) {
  if (typeof value !== 'string') {
    return undefined;
  }
  if ([`work`, `home`, `personal`].includes(value)) {
    return value;
  } else {
    return undefined;
  }
}

export function parseFilterParams(query) {
  const { isFavourite, contactType } = query;

  const parsedFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedFavourite,
    contactType: parsedContactType,
  };
}
