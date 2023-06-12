using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace TaskManager.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StripeController : ControllerBase
  {
    [HttpPost("create-checkout-session")]
    public ActionResult Create()
    {
      var coffee = "price_1NCEovI7fId8WMNyQ6TRcT9v";
      var domain = "https://salmon-desert-0086f8d10.3.azurestaticapps.net";
      var options = new SessionCreateOptions
      {
        LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = coffee,
                    Quantity = 1,
                  },
                },
        Mode = "payment",
        SuccessUrl = domain,
        CancelUrl = domain,
      };
      var service = new SessionService();
      Session session = service.Create(options);

      return Ok(new { id = session.Id });
    }
  }
}