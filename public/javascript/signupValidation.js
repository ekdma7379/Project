$(document).ready(function() {
    $("#signupForm").submit(function() {
        if( !$("#email").val() ) {
            alert('이메일을 입력해주세요.');
            return false;
        }
        if( !$("#password").val()) {
            alert('비밀번호를 입력해주세요.');
            return false;
        }
        if( !$("#repassword").val()) {
            alert('비밀번호 확인을 입력해주세요.');
            return false;
        }
        if( $("#password").val() != $("#repassword").val()) {
            alert('비밀번호와 비밀번호확인이 다릅니다.');
            return false;
        }
        if( !$("#name").val() ) {
            alert('이름을 입력해주세요.');
            return false;
        }
        if( !$("#location").val()) {
            alert('사는 지역을 입력해주세요.');
            return false;
        }
        if( !$("#age").val()) {
            alert('나이을 입력해주세요.');
            return false;
        }
        if( !$("#part").val()) {
            alert('선호장르를 입력해주세요.');
            return false;
        }
    });
});
