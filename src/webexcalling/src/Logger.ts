/**
 *
 * @param error
 */
export function formatError(error: any) {
    if (!error) {
      return '';
    }
  
    if (error.stack) {
      return `fileName: '${error.fileName}', name: '${error.name}' lineNumber:${error.lineNumber} columnNumber:${error.columnNumber} message:'${error.message}'.`;
    }
  
    if (error.message) {
      return error.message;
    }
    return JSON.stringify(error);
  }
  
  /**
   *
   * @param text
   * @param leadingCharactersToKeep
   */
  export function concise(text = '', leadingCharactersToKeep = 32) {
    if (text.length > leadingCharactersToKeep) {
      return `${text.substring(0, leadingCharactersToKeep - 1)}...`;
    }
    return text;
    // return text ? (text.length > leadingCharactersToKeep ? text.substring(0, leadingCharactersToKeep - 1) + '...' : text) : '';
  }

  export function downloadLogs() {
    let content = localStorage.getItem("log");
    if (!content) {
        content = "";
    }
    const a = document.createElement("a");
    a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    a.setAttribute("download", "msteams-integration.log");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  export class Logger {
    static maxLogSizeInBytes: 500000;
    static log(level: string, msg: string) {
      const logMsg: string[] = [];
      logMsg.push(new Date().toISOString()," ", "[", level, "]", " ", msg, "\n");
      if (level == "error") {
        //console.log(getErrorObject());
        }
        if (level !== "debug") {
            let log = localStorage.getItem("log");
            if (!log) {
                log = "";
            }
            if (log.length > Logger.maxLogSizeInBytes) {
                localStorage.removeItem("log");
                log = "";
            }
            localStorage.setItem("log", log + logMsg.join(""));
        }
      // console.log(`${new Date().toISOString()} [${level}] ${msg}\n`, 'test' );
    }
  
    static debug(msg: string) {
      Logger.log('debug', msg);
    }
  
    static info(msg: string) {
      Logger.log('info', msg);
    }
  
    static error(msg: string) {
      Logger.log('error', msg);
    }
  }
  
  export enum LOGGER {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    LOG = "log",
    TRACE = "trace"
}