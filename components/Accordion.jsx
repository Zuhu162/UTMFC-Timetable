import React from "react";

const Accordion = (props) => {
  return (
    <div className="bg-base-100 join join-vertical w-full h-[100%]">
      <div className="collapse collapse-arrow join-item border-b-2 border-base-500 rounded-none">
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-title text-md flex font-medium text-alpha">
          <p>{props.value}</p>
        </div>
        <div className="collapse-content max-h-96 overflow-auto">
          {props.courses.map((course) => (
            <div className="p-4" key={course.kod_kursus}>
              <p>Course Code:{course.kod_subjek}</p>
              <p>Course Name: {course.nama_subjek}</p>
              <p>Section: {course.seksyen}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
