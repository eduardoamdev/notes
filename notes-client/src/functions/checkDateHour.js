const checkDateHour = (text) => {
  //eslint-disable-next-line
  const dateHourRegexp = /\d{4,4}\-\d{2,2}\-\d{2,2}\T\d{2,2}\:\d{2,2}\:\d{2,2}$/;
  if (dateHourRegexp.test(text)) {
    return true;
  } else {
    return false;
  }
}

export default checkDateHour;
