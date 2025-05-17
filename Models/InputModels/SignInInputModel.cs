using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zone1295.Models.InputeModels
{
    public class SignInInputModel{
        [Required]
        [Display(Name ="Login Provider")]
        public string LoginProvider { get; set;} = string.Empty;

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set;} = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set;} = string.Empty;
    
        [Required]
        [Display(Name = "Remember me")]
        public bool RememberMe { get; set;} 
    }
}