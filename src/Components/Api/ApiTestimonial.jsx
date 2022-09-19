
import { useQuery, gql } from '@apollo/client';

    const TESTIMONIALS_QUERY = gql`
        {
            testimonials {
                id
                name
                occupation
                testimonial
            }
        }
    `;

const ApiTestimonial = () => {
    const data = useQuery(TESTIMONIALS_QUERY).data;

    return (
        <>
        {data && (
            <>
            {data.testimonials.map(testimonial => (
                <>
                <h3>{testimonial.name}</h3>
                <h3>{testimonial.occupation} </h3>
                <h4>Testimonial</h4>
                <p>{testimonial.testimonial}</p>
                </>
            ))}
            </>
        )}
        </>
        
    );
};


export default ApiTestimonial;