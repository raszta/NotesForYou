using System.Linq;
using AutoMapper;
using NotesForYou.API.Dtos;
using NotesForYou.API.Models;
namespace NotesForYou.API.Helpers {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile () {
            CreateMap<User, UserForDetailedDto> ()
                .ForMember (dest => dest.Age, opt => {
                    opt.ResolveUsing (d => d.DateOfBirth.CalculateAge ());
                });
            CreateMap<User, UserForListDto> ()
                .ForMember (dest => dest.Age, opt => {
                    opt.ResolveUsing (d => d.DateOfBirth.CalculateAge ());
                });
            CreateMap<UserToRegisterDto, User> ();
            CreateMap<UserForUpdateDto, User> ();
            CreateMap<NoteToUpdateDto, Note> ();
            CreateMap<NoteForGoldenThoughtDto, Note> ();
            CreateMap<NoteForCreationDto, Note> ();
            CreateMap<Note, NoteToReturnDto> ();
        }
    }
}