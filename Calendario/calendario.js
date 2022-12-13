function savehoras(){
    var lunes = document.getElementById("lunes");
    localStorage.setItem("lunes",lunes);

    var martes = document.getElementById("martes");
    localStorage.setItem("martes",martes);

    var miercoles = document.getElementById("miercoles");
    localStorage.setItem("miercoles",miercoles);

    var jueves = document.getElementById("jueves");
    localStorage.setItem("jueves",jueves);

    var viernes = document.getElementById("viernes");
    localStorage.setItem("viernes",viernes);

    var sabado = document.getElementById("sabado");
    localStorage.setItem("sabado",sabado);

    var domingo = document.getElementById("domingo");
    localStorage.setItem("domingo",domingo);
}