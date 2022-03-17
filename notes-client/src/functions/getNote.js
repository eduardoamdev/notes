import domain from "../domain";

const getNote = async (ax, id) => {
  let response = await ax.get(`${domain}/api/user/note/${id}`, {
    headers: {
      token: window.localStorage.token,
    },
  });
  if (response.data.success === false) {
    return {
      loading: false,
      success: false,
    };
  } else {
    let date = response.data.note.date.split("T");
    let hour = date[1].split(".")[0];
    date = date[0];
    return {
      loading: false,
      success: true,
      id: response.data.note._id,
      date: date,
      hour: hour,
      title: response.data.note.title,
      content: response.data.note.content,
    };
  }
};

export default getNote;
