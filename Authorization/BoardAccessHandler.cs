using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

// public class BoardAccessHandler : AuthorizationHandler<BoardAccessRequirement, Board>
// {
//     protected override Task HandleRequirementAsync(
//         AuthorizationHandlerContext context,
//         BoardAccessRequirement requirement,
//         Board board)
//     {
//         // Public access
//         if (board.AccessLevel == BoardAccessLevel.Public)
//         {
//             context.Succeed(requirement);
//             return Task.CompletedTask;
//         }

//         // Check authentication for non-public boards
//         if (!context.User.Identity.IsAuthenticated)
//         {
//             return Task.CompletedTask;
//         }

//         // Check access level
//         switch (board.AccessLevel)
//         {
//             case BoardAccessLevel.User:
//                 context.Succeed(requirement);
//                 break;
                
//             case BoardAccessLevel.Admin:
//                 if (context.User.IsInRole("Admin"))
//                 {
//                     context.Succeed(requirement);
//                 }
//                 break;
//         }

//         return Task.CompletedTask;
//     }
// }