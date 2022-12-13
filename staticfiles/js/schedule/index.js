document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: "{{ today_ymd }}",
      editable: true,
      navLinks: true, // can click day/week names to navigate views
      dayMaxEvents: true, // allow "more" link when too many events
      selectable: true,

      // 이벤트 기간을 드래그해서 선택한 후에 이벤트 정보를 등록합니다.
      select: function (event) {
        let inputString = prompt("등록할 스케쥴 제목을 입력해주세요.");
        if ((inputString != null) && (inputString != "")) {
          // XMLHttpRequest 객체를 이용한 Ajax 통신 방식으로 화면에 신규로 등록된 데이터를 JSON 포맷으로 서버에 전달한다.
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            // 서버에서 응답 코드 200이 오면 정상적으로 응답이 온 것으로 판단하고 화면에 이벤트 정보를 추가한다.
            if (this.readyState == 4 && this.status == 200) {
              // 서버에서 보낸 JSON 문자열을 JSON 객체로 변환한다.
              const res = JSON.parse(this.responseText);
              if ((res.result == "success") && (res.eventId != null) && (res.eventId != "")) {
                // Calendar 객체에 새로 등록된 이벤트 정보를 추가한다.
                calendar.addEvent({id: res.eventId, title: inputString, start: event.startStr, end: event.endStr});
              }
            }
          };

          // '/schedule/set_all_day_event/' URL을 POST 방식으로 접근한다.
          xhr.open("POST", '/schedule/set_all_day_event/');
          // 서버에 전송할 데이터가 JSON 포맷임을 Request Content-Type 헤더에 지정한다.
          xhr.setRequestHeader('Content-Type', 'application/json');
          // CSRF 공격(Cross Site Request Forgery) 해킹을 방지하기 위한 CSRFToken을 Request X-CSRFToken 헤더에 지정한다.
          xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));

          // 화면에 신규로 등록된 데이터를 JSON 포맷으로 서버에 전달한다.
          xhr.send(JSON.stringify({title: inputString, start: event.startStr, end: event.endStr, allDay: event.allDay}));
        }
      },

      // 특정 이벤트를 클릭합니다.
      eventClick: function (event) {

        const eventId = event.event._def.publicId;
        const eventName = event.event._def.title;

        //이벤트 정보를 수정하기 위해서 Admin 페이지의 Calendar 데이터 수정 화면을 오픈한다.
        //const eventWindow = window.open(
        //  "/admin/schedule/calendar/" + eventId + "/change/",
        //  eventName,
        //  "left=100,top=100,width=780,height=670"
        // );
        console.log(event.event._def)
        event
          .event
          .remove()
        // 이벤트 정보 수정을 위해서 오픈된 팝업이 닫히면 부모 창의 화면을 새로고침 한다.
        //eventWindow.addEventListener("beforeunload", function(event) {
        // 현재 화면을 새로고침한다.
        // window.document.location.reload();
        //});

        // 오픈된 팝업의 Admin 헤더 영역을 보이지 않도록 한다.
        setTimeout(() => {
          eventWindow
            .document
            .getElementById("header")
            .style
            .display = "none";
        }, 500);

      },
      // 화면에 보여줄 이벤트 정보를 요청합니다.
      events: {
        url: '/schedule/get_events/',
        failure: function () {
          document
            .getElementById('script-warning')
            .style
            .display = 'block'
        }
      },
      loading: function (bool) {
        document
          .getElementById('loading')
          .style
          .display = bool
            ? 'block'
            : 'none';
      }
    });

    calendar.render();
  });