const getFileUrl = (str) => {
  if (!str.includes("drive.google.com")) return str;
  const id = str.replace('https://drive.google.com/file/d/', '').replace('/view?usp=sharing', '');
  return `https://lh3.googleusercontent.com/d/${id}`
}

window.DriveImageWidget = createClass({
  getInitialState() {
    return {
      value: this.props.value || ""
    };
  },

  updateValue(value) {
    this.setState({ value });
    this.props.onChange(value);
  },

  convertDriveUrl(url) {
    const match = url.match(/\/d\/([^/]+)/);

    if (!match) {
      return url;
    }

    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  },

  render() {
    const { value } = this.state;

    return h(
      "div",
      {},
      h("input", {
        type: "text",
        value,
        class: "css-83wr9v",
        placeholder: "Paste Google Drive share link",
        onChange: e =>
          this.updateValue(
            e.target.value
          )
      }),

      value &&
      h("img", {
        src: getFileUrl(value),
        referrerPolicy: "no-referrer",
        style: {
          marginTop: "10px",
          maxHeight: "200px",

          display: "block",
          borderRadius: "5px"
        }
      })
    );
  }
});


