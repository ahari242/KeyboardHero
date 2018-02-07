using KeyboardHero.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KeyboardHero.DAL
{
    public class KeyboardHeroInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<KeyboardHeroContext>
    {
        protected override void Seed(KeyboardHeroContext context)
        {
            var songs = new List<Song>
            {
                new Song {id=1,artist="OMFG",title="Wonderful",bpm=104,length=238, file="omfg-wonderful.mp3" }
            };

            songs.ForEach(x => context.Songs.Add(x));
            context.SaveChanges();
        }
    }
}