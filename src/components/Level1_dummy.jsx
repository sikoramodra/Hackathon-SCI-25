function Level1({ test, complete }) {
  return (
    <div>
      <p>{test ? 'hi' : 'no hi'}</p>
      {test && (
        <button type="button" onClick={complete}>
          click me
        </button>
      )}
    </div>
  );
}

export default Level1;
