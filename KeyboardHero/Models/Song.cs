using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KeyboardHero.Models
{
    public class Song
    {
        public int id { get; set; }
        public string artist { get; set; }
        public string title { get; set; }
        public int bpm { get; set; }
        public int length { get; set; }
        public string file { get; set; }
    }
}