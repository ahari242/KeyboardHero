using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.ModelConfiguration.Conventions;
using KeyboardHero.Models;

namespace KeyboardHero.DAL
{
    public class KeyboardHeroContext : DbContext
    {
        public KeyboardHeroContext() : base("KeyboardHeroContext")
        {

        }

        public DbSet<Song> Songs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}