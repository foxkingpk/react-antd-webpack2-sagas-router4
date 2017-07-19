
const getMLodop = () => {
  let mLODOP;
  try {
    mLODOP = window.getCLodop();
  } catch (err) {
      
  };
  
  if ((mLODOP != null) && (typeof (mLODOP.VERSION) !== 'undefined')) {
    return mLODOP;
  } else {
    return null;
  }
};

const init = () => {
  const mLODOP = getMLodop();
  if (mLODOP) {
    return true;
  } else {
    return false;
  }
};

const preview = () => {
  const mLODOP = getMLodop();
  if (mLODOP) {
    mLODOP.PREVIEW();
  }
};
const checkPrinter = (printerName) => {
  const mLODOP = getMLodop();
  const n = mLODOP.GET_PRINTER_COUNT();
  if (n > 0) {
    let isExist = false;
    for (let i = 0; i < n; i++) {
      const name = window.LODOP.GET_PRINTER_NAME(i);
      if (name === printerName) {
        isExist = true;
        break;
      }
    }
    return isExist;
  } else {
    return false;
  }
};
const printResume = (id) => {
  return window.LODOP.SET_PRINT_MODE('CONTROL_PRINTER:' + id, 'RESUME');
}
const printPurge = (id) => {
  return window.LODOP.SET_PRINT_MODE('CONTROL_PRINTER:' + id, 'PURGE');
};
export default {
  getMLodop,
  init,
  preview,
  checkPrinter,
  printResume,
  printPurge
};
