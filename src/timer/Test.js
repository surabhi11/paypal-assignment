export default function Test({ ...props }) {
    console.log("props", props.text)
    const {
        text,
        handleDelete
    } = props;
    return (
        <div style={{ margin: '10px 0', width: '100px', border: '2px solid grey', padding: '8px 16px' }}
            onClick={handleDelete}>{text}</div>
    )
}