import { gql } from '@apollo/client';

export const ACTORS_QUERY = gql`
	{
		actors {
			id
			name
			img
			alt
			imdb
			bio
		}
	}
`;

 export   const DEL_ACTOR = gql`
			mutation deleteActor($name: String!) {
				deleteActor(name: $name) {
					id
					name
					img
					alt
					imdb
					bio
				}
			}
		`;

export const TESTIMONIALS_QUERY = gql`
			{
				testimonials {
					id
					name
					occupation
					testimonial
				}
			}
		`;

export const DEL_TESTIMONIAL = gql`
	mutation deleteTestimonial($name: String!) {
		deleteTestimonial(name: $name) {
			id
			name
			occupation
			testimonial
		}
	}
`;
