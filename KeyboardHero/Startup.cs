using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KeyboardHero.Startup))]
namespace KeyboardHero
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
