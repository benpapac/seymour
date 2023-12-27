import { gql } from '@apollo/client';

export const ACTORS_QUERY = gql`
	query actors {
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

export const DEL_ACTOR = gql`
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

export const NEW_ACTOR = gql`
	mutation newActor(
		$name: String!
		$img: String!
		$alt: String
		$imdb: String
		$bio: String!
	) {
		newActor(name: $name, img: $img, alt: $alt, imdb: $imdb, bio: $bio) {
			id
			name
			img
			alt
			imdb
			bio
		}
	}
`;

export const NEW_TESTIMONIAL = gql`
	mutation newTestimonial(
		$name: String!
		$occupation: String
		$testimonial: String!
	) {
		newTestimonial(
			name: $name
			occupation: $occupation
			testimonial: $testimonial
		) {
			id
			name
			occupation
			testimonial
		}
	}
`;

export const NEW_BLOG = gql`
	mutation newBlog($title: String!, $body: String!) {
		newBlog(title: $title, body: $body) {
			id
			title
			body
		}
	}
`;

export const UPDATE_BLOG = gql`
	mutation updateBlog($oldTitle: String!, $title: String!, $body: String!) {
		updateBlog(oldTitle: $oldTitle, title: $title, body: $body) {
			id
			title
			body
		}
	}
`;

export const BLOGS_QUERY = gql`
	query blogs {
		blogs {
			id
			title
			body
		}
	}
`;

export const DEL_BLOG = gql`
	mutation deleteBlog($title: String!) {
		deleteBlog(title: $title) {
			id
			title
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
