export function LinkWindow(id: string, windowsContext: any) {
  if (windowsContext.context.windows[id].isClose) {
    let newContext:any = windowsContext.context;
    for (var window in newContext.windows) {
      if (window = id) {
        newContext.windows[id].isClose = false;
        newContext.windows[id].zIndex = 11;
        windowsContext.setContext({"windows" : newContext.windows});
      }
    }
  } else {
      let newContext:any = windowsContext.context;
      for (var window in newContext.windows) {
        if (window = id) {
          newContext.windows[id].isMinimize = false;
          newContext.windows[id].zIndex = 11;
          windowsContext.setContext({"windows" : newContext.windows});
        }
    }
  }
  return true
}