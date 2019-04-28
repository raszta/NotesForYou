using System.Linq;
using AutoMapper;
using NotesForYou.API.Dtos;
using NotesForYou.API.Models;
namespace NotesForYou.API.Helpers {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile () {
            // CreateMap<User, UserForDetailedDto> ()
            //     .ForMember (dest => dest.PhotoUrl, opt => {
            //         opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url);
            //     })
            //     .ForMember (dest => dest.Age, opt => {
            //         opt.ResolveUsing (d => d.DateOfBirth.CalculateAge ());
            //     });
            // CreateMap<User, UserForListDto> ()
            //     .ForMember (dest => dest.PhotoUrl, opt => {
            //         opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url);
            //     }).ForMember (dest => dest.Age, opt => {
            //         opt.ResolveUsing (d => d.DateOfBirth.CalculateAge ());
            //     });
            CreateMap<UserToRegisterDto, User> ();
        }
    }
}