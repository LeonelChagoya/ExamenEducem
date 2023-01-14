using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Text.RegularExpressions;
using DataFramework;

namespace DashboardProduccion.Tools {
    public static class Connection {
        private static string appConStr;
        private static string fimaConStr;
        private static string fimaSistemaChecadasConStr;

        public static DataManager App { get{ return new DataManager(appConStr); }}
        public static DataManager Fima { get { return new DataManager(fimaConStr); }}
        public static DataManager FimaSistemaChecadas { get { return new DataManager(fimaSistemaChecadasConStr); }}

        public static string AppDBName;
        public static string FimaDBName;
        public static string FimaSistemaChecadasDBName;

        static Connection() {
            appConStr = ConfigurationManager.ConnectionStrings["APP"].ConnectionString;
            AppDBName = GetDBName(appConStr);

            fimaConStr = ConfigurationManager.ConnectionStrings["FIMA"].ConnectionString;
            FimaDBName = GetDBName(fimaConStr);

            fimaSistemaChecadasConStr = ConfigurationManager.ConnectionStrings["FIMASistemaChecadas"].ConnectionString;
            FimaSistemaChecadasDBName = GetDBName(fimaSistemaChecadasConStr);
        }

        private static string GetDBName(string configString) {
            string catalogPart = configString
                .Split(';')
                .FirstOrDefault(s => s.Split('=')[0].Trim() == "database");
            if (string.IsNullOrEmpty(catalogPart)) {
                return null;
            }
            return catalogPart.Split('=')[1].Trim();
        }
    }
}