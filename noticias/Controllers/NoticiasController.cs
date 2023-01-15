using DataFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DashboardProduccion.Controllers
{
    public class NoticiasController : Controller
    {
        // GET: Noticias
        public ActionResult Index()
        {
            return View();
        }

        public class Usuarios
        {
            public int idusuario { get; set; }
            public string nombre { get; set; }
            public string correo { get; set; }
            public string contraseña { get; set; }
            public bool es_interno { get; set; }
        }
        //metodo post agrega un usuario nuevo
        [HttpPost]

        public void agregarUsuario(Usuarios usuario)
        {
            Query q = new Query()
                .Insert("Usuarios")
                .InsFldVal("nombre", usuario.nombre)
                .InsFldVal("correo", usuario.correo)
                .InsFldVal("contraseña", usuario.contraseña)
                .InsFld("es_interno", usuario.es_interno);               ;
            Tools.Connection.Exa.Exec(q);
        }


    }
}