using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Text.RegularExpressions;
using DataFramework;

namespace DashboardProduccion.Tools {
    public static class Connection {
        private static string appConStr;
     

        public static DataManager Exa { get{ return new DataManager(appConStr); }}
      

        public static string ExaDBName;
       

        static Connection() {
            appConStr = ConfigurationManager.ConnectionStrings["EXA"].ConnectionString;
            ExaDBName = GetDBName(appConStr);

            
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