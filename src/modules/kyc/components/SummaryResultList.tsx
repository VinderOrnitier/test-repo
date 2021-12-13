import { fromCamelCase } from "../../../helpers";

const SummaryResultList = ({form}: any) => {
  return (
    <div>
      {Object.entries(form).map(([label, value]: [string, any]) => {
        if (label === 'createdAt' && value) {
          return (
            <div className="flex mb-2" key={label}>
              <b className="mr-4">{fromCamelCase(label)}:</b>
              <span className="text-white truncate max-w-sm">
                {new Date(value.seconds * 1000).toLocaleDateString()}
              </span>
            </div>
          );
        } else {
          return (
            value && (
              <div className="flex mb-2" key={label}>
                <b className="mr-4">{fromCamelCase(label)}:</b>
                <span className="text-white truncate max-w-sm">{value}</span>
              </div>
            )
          );
        }
      })}
    </div>
  )
}

export default SummaryResultList