export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="quizzes">QUIZZES</option>
                <option value="exams">EXAMS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">PERCENTAGE</option>
                <option value="points">POINTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">ONLINE</option>
                <option value="in-person">IN PERSON</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div style={{ paddingLeft: '20px' }}>
                <label>Online Entry Options</label><br />
                <input id="wd-text-entry" type="checkbox" value="text-entry" name="entry-options" />
                <label htmlFor="wd-text-entry">Text Entry</label><br />
                <input id="wd-website-url" type="checkbox" value="website-url" name="entry-options" />
                <label htmlFor="wd-website-url">Website URL</label><br />
                <input id="wd-media-recordings" type="checkbox" value="media-recordings" name="entry-options" />
                <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                <input id="wd-student-annotation" type="checkbox" value="student-annotation" name="entry-options" />
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                <input id="wd-file-upload" type="checkbox" value="file-upload" name="entry-options" />
                <label htmlFor="wd-file-upload">File Upload</label>
              </div>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date"/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date"/>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date"/>
            </td>
          </tr>
        </table>
      </div>
  );}
  
  