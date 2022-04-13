const useScrollEvents = (callback) => {
    return { onScroll: event => {
      callback(event);
    },
    onScrollBeginDrag: event => {
        callback(event);
    },
    onScrollEndDrag: event => {
        callback(event);
    },
    onMomentumScrollBegin: event => {
        callback(event);
    },
    onMomentumScrollEnd: event => {
        callback(event);
    },
  }
}

export default useScrollEvents;