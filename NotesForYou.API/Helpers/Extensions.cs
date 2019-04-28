using System;
using Microsoft.AspNetCore.Http;

namespace NotesForYou.API.Helpers {
    public static class Extensions {
        public static void AddapplicationError (this HttpResponse response, string message) {
            response.Headers.Add ("Application-Error", message);
            response.Headers.Add ("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add ("Acces-Control-Allow-Origin", "*");
        }

        public static int CalculateAge (this DateTime theDateTime) {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddDays (age) > DateTime.Today) {
                age--;
            }

            return age;
        }
    }
}