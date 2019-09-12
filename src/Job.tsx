import React from "react";
import {useEffect} from "react";
import {useReducer} from "react";
import axios from "axios";

type Job = {
    id: string;
    description: string
}

type Action = { type: "FetchReturned", payload: Job } | { type: "Foo", payload: string } ;

const reducer = (state1: Job | null, action: Action): Job | null => {
    if (action.type === "FetchReturned") {
        return action.payload;
    } else if (action.type === "Foo") {
        return null;
    } else {
        throw Error();
    }
};

export const Job = ({id}: { id: number }) => {

    const [job, dispatch] = useReducer(reducer, null);

    // const combo = combine(x,y,z);

    useEffect(() => {

        let mounted = true;




        const fetch = async () => {

            //ajax call to fetch Job
            const url = `http://52.203.142.138:84/api/job/job.jsp?id=${id}`;
            const response = await axios.get<Job>(url);

            if (mounted) {
                const job = response.data;

                dispatch({
                    type: "FetchReturned",
                    payload: job
                });
            }

        };

        fetch();

        return () => {
            mounted = false;
        };

    }, [id]);

    return <div>
        {job === null ? <div>Loading...</div> : <JobVu job={job}/>}
    </div>;
};

export const JobVu = ({job}: { job: Job }) => {
    return <div>
        <div>{job.id}</div>
        <div>{job.description}</div>
    </div>;
};