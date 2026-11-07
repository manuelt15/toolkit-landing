export const CLAVE = "tema";

// Se inyecta en <head> y corre antes de pintar: sin destello del tema equivocado.
export const themeScript = `(()=>{try{var t=localStorage.getItem("${CLAVE}");var d=t==="oscuro"||(t!=="claro"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

